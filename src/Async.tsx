import {
  FC,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

enum AsyncStatus {
  loading,
  success,
  error,
}

interface AsyncProps<T> {
  action: () => Promise<T>;
  children: (data: T) => ReactNode;
}

export default function Async<T>({ action, children }: AsyncProps<T>) {
  const resolvedRef = useRef(false);
  const [status, setStatus] = useState(AsyncStatus.loading);
  const [data, setData] = useState<T | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (resolvedRef.current) {
      return;
    }

    resolvedRef.current = true;

    const resolvePromise = async () => {
      try {
        const data = await action();

        setStatus(AsyncStatus.success);
        setData(data);
      } catch (err) {
        setStatus(AsyncStatus.error);
        setErrorMessage(err as string);
      }
    };

    resolvePromise();
  }, []);

  if (status === AsyncStatus.loading) {
    return <div>Wczytywanie...</div>;
  }

  if (status === AsyncStatus.error) {
    return <div>{errorMessage}</div>;
  }

  if (data) {
    return <>{children(data)}</>;
  }

  return null;
}

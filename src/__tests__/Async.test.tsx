import { render, screen, waitFor } from '@testing-library/react';
import Async from '../Async';

describe('<Async />', () => {
  it('renders Promise resolved data when success', async () => {
    const promiseResolveValue = 'test message';

    render(
      <Async
        action={() =>
          new Promise<typeof promiseResolveValue>((resolve) =>
            resolve(promiseResolveValue),
          )
        }
      >
        {(test) => <div>{test}</div>}
      </Async>,
    );

    expect(screen.getByText('Wczytywanie...')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(promiseResolveValue)).toBeDefined();
    });
  });

  it('renders Promise rejected data when error', async () => {
    const promiseRejectValue = 'there is an error';

    render(
      <Async
        action={() =>
          new Promise<typeof promiseRejectValue>((_, reject) =>
            reject(promiseRejectValue),
          )
        }
      >
        {(test) => <div>{test}</div>}
      </Async>,
    );

    expect(screen.getByText('Wczytywanie...')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(promiseRejectValue)).toBeDefined();
    });
  });
});

import fs from 'node:fs/promises';

import { Suspense } from 'react';

import UsePromiseDemo from '@/components/UsePromisesDemo';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf-8');
      const users = JSON.parse(data);
      // resolve(users);
      reject(new Error('Error!'));
    }, 2000)
  );

  return (
    <main>
      <ErrorBoundary fallback={<span>Something went wrong!</span>}>
        <Suspense fallback={<span>Loading users...</span>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

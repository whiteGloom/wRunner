import ghpages from 'gh-pages';

function updateServiceBranches(branches) {
  let current = 0;

  function update() {
    const { dir, branchName, logs } = branches[current];
    ghpages.publish(`${dir}`, { branch: `${branchName}` }, (err) => {
      if (err) console.log(err);
      console.log(`${logs}`);
      if (branches[current + 1]) {
        current += 1;
        update();
      }
    });
  }

  update();
}

updateServiceBranches([
  {
    dir: 'prod',
    branchName: 'production',
    logs: 'Prod branch updated.',
  },
  {
    dir: 'docs',
    branchName: 'gh-pages',
    logs: 'GitHub Pages branch updated.',
  },
]);

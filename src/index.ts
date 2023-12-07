import express from 'express';
import { Octokit } from 'octokit';

const app = express();
const port = process.env.PORT || 3001;

console.log(process.env.GH_TOKEN);

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

app.locals.octokit = octokit;

app.get('/', async (req, res) => {
  let objs = [];
  const octokit = req.app.locals.octokit;

  const iterator = octokit.paginate.iterator('GET /user/repos', {
    per_page: 120,
  });

  for await (const { data } of iterator) {
    const filt = data
      // .filter((each: any) => {
      //   const fullName = each?.['full_name'];
      //   return fullName?.includes('-notes') ?? false;
      // })
      .map((each: any) => {
        const name = each['full_name'];
        const prefix = name?.split('-')?.[0] ?? '';

        // return {
        //   name,
        //   prefix,
        // };
        return name;
      });

    objs.push(...filt);
  }

  // const grouped = groupBy(objs, 'prefix');
  res.json(objs);
});

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

app.get('/starts', async (req, res) => {
  const x = await octokit.request('GET /user/starred', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  // res.json(
  //   x.data.map(e => {
  //     return {
  //       name: e['full_name'],
  //       url: e['html_url'],
  //     };
  //   }),
  // );

  res.json(x);
});

const groupBy = function(xs: any, key: any) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

# Projects Hub

A clean static projects overview page for `projects.jellewijma.com`.

## Edit projects

Project data lives in `script.js` in the `projects` array. Add a new object with:

```js
{
  title: "Project name",
  category: "Web",
  status: "In progress",
  description: "Short project summary.",
  links: [
    { label: "View project", url: "https://example.com", kind: "External", primary: true, external: true },
    { label: "GitHub/source", url: "https://github.com/example/repo", kind: "Source", external: true },
    { label: "Notes", url: "https://example.com/notes", kind: "Notes", external: true }
  ]
}
```

Supported categories are `Web`, `Audio`, `Lighting`, `AI`, and `Experiments`.

## Deploy to GitHub Pages

1. Create a GitHub repository for this site.
2. Push these files to the repository.
3. In GitHub, open **Settings > Pages**.
4. Set the source to your main branch and root folder.
5. Keep the `CNAME` file with `projects.jellewijma.com`.
6. Add a DNS `CNAME` record for `projects` pointing to `<your-github-username>.github.io`.
7. In **Settings > Pages**, set the custom domain to `projects.jellewijma.com` and enable HTTPS once GitHub allows it.

# EmptyState

Explain an empty resource and offer a useful next action. For example, show why a search has no results, help someone create their first project, or describe a completed task list.

```tsx
import { Button, EmptyState } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

<EmptyState
  icon={<SearchIcon />}
  title="No results found"
  description="Try changing your search or removing a filter."
>
  <Button onClick={clearFilters}>Clear filters</Button>
</EmptyState>;
```

The component is also available as the default and named export from `rsuite/EmptyState`. Import `rsuite/EmptyState/styles/index.css` when using individual styles, or use the full RSuite stylesheet.

| Prop         | Type                       | Default  | Purpose                                           |
| ------------ | -------------------------- | -------- | ------------------------------------------------- |
| title        | ReactNode                  | —        | Heading describing the empty resource.            |
| description  | ReactNode                  | —        | Guidance, links, or other explanatory content.    |
| icon         | ReactNode                  | —        | Decorative icon or illustration.                  |
| children     | ReactNode                  | —        | Caller-owned actions or supporting content.       |
| size         | 'sm' \| 'md' \| 'lg'       | 'md'     | Spacing, heading size, and icon size.             |
| align        | 'start' \| 'center'        | 'center' | Alignment; `start` follows the reading direction. |
| headingLevel | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | 3        | Heading level for the surrounding page hierarchy. |

Standard Box props, `as`, `ref`, DOM attributes and CustomProvider component defaults are supported. Colors follow the current RSuite theme. Text and actions belong to the application, so they can be localized without replacing the component.

Choose a heading level that fits the page. Icons are decorative and hidden from assistive technology; keep controls and meaningful links in `description` or `children`. The component preserves ordinary keyboard navigation and does not announce itself or move focus automatically. When an asynchronously updated search needs an announcement, manage a separate live region for the result count.

These source examples accompany the new API. The production documentation site continues to use the published npm version; its page and navigation entry should be added with the release containing EmptyState.

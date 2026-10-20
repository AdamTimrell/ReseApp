# Responsive layout conventions

This folder is reserved for the student's `Navbar.tsx`, `Footer.tsx`, and optional
`PageContainer.tsx` / `AppLayout.tsx`. No layout or navigation is implemented yet.

- Use mobile-first Tailwind classes: base styles for 375px, `md:` (48rem) for
  tablet, and `lg:` (64rem) for desktop. Keep the default breakpoints.
- Future country grids: `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`.
- Future search/filter controls: `flex flex-col gap-3 md:flex-row` with flexible
  widths and `min-w-0` where children need to shrink.
- Future page containers: `mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8`.
  Avoid fixed widths and fix overflowing content instead of hiding page overflow.
- Use React Router `Link` / `NavLink` inside semantic `nav`, `main`, and `footer`
  elements. Plan a Sheet menu below `lg` and visible desktop links at `lg`.
- Import primitives from `@/components/ui/<name>`. They use the configured
  shadcn Base UI style; preserve their keyboard, focus, and ARIA behavior.
- Associate `Label` and input IDs, name icon-only controls, and provide
  `SheetTitle` / `SheetDescription` for mobile menus. Tooltips do not replace labels.
- The generated style has compact controls. For touch controls, apply
  `min-h-11` (and `min-w-11` for icon buttons), including menu triggers and close
  buttons. Preserve visible keyboard focus and verify contrast in context.
- Wrap tooltip consumers in `TooltipProvider` from `@/components/ui/tooltip`
  when tooltips are first introduced; no provider is needed by the current app.

When layouts are implemented, verify keyboard navigation and check at 375px,
tablet, and desktop widths, including long names and open menus. Confirm there
is no horizontal page scrolling. These layouts have not been visually tested yet.

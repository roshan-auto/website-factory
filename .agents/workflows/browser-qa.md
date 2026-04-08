# Browser QA Workflow

## Goal
Use the browser to inspect a page, capture visual issues, and report the most important problems before shipping.

## Steps

1. Open the target page
- Use the local dev URL or preview deployment URL provided by the user
- Start with the homepage unless another page is specified

2. Run browser inspection
- Scroll through the full page
- Check desktop first, then mobile
- Observe layout, spacing, typography, buttons, forms, images, and navigation
- Check browser console for obvious errors

3. Capture findings
Identify and summarize:
- layout issues
- spacing inconsistencies
- broken or weak responsive behavior
- CTA visibility problems
- visual bugs
- console errors
- missing sections or obviously incomplete content

4. Save evidence
- Capture screenshots if available
- Reference the page section where each issue appears

5. Prioritize
List:
- top 3 critical issues
- top 5 polish issues

6. Output
Provide:
- concise QA summary
- issue list ordered by impact
- suggested fixes
- whether the page is ready for refinement or close to ship

## Rules
- Do not make code changes in this workflow
- Focus on inspection and reporting
- Be specific and practical
- Prefer high-impact issues over tiny subjective opinions

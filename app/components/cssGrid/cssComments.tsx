// Wraps every /* comment */ in a span so it can be styled apart from the code.
// split() with a capture group puts the comments at the odd indexes.
export function CssComments({
  children,
  commentClassName,
}: {
  children: string;
  commentClassName: string;
}) {
  return (
    <>
      {children.split(/(\/\*[\s\S]*?\*\/)/).map((part, i) =>
        i % 2 ? (
          <span key={i} className={commentClassName}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

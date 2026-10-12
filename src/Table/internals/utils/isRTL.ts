export default function isRTL() {
  return (
    typeof window !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl'
  );
}

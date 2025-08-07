import Skeleton from '@mui/material/Skeleton';

const SKELETON_COUNT = 6;

export default function SectorSummarySkeleton() {
  return (
    <section className="sector-summary grid gap-4" aria-label="Sector Summary loading skeleton">
      {[...Array(SKELETON_COUNT)].map((_, id) => (
        <div  key={id} aria-hidden="true">
        <Skeleton  sx={{ bgcolor: 'grey' }} variant="rounded" width="20em" height="10em" animation="wave"/>
        </div>
      ))}
    </section>
  );
}

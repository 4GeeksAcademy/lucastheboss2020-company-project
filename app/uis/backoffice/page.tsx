import BackofficeHome from "../../../uis/backoffice/BackofficeHome";

export default function BackofficeRoute({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return <BackofficeHome searchParams={searchParams} />;
}

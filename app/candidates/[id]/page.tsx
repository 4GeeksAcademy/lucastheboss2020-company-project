import CandidateDetailClient from "./CandidateDetailClient";

interface CandidateDetailPageProps {
  params: { id: string };
}

export default function CandidateDetailPage({ params }: CandidateDetailPageProps) {
  return <CandidateDetailClient id={params.id} />;
}

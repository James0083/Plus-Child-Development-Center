import HeroBanner from "@/components/home/HeroBanner";
import MapSection from "@/components/home/MapSection";
import ProgramCards from "@/components/home/ProgramCards";
import QuickConsult from "@/components/home/QuickConsult";
import StatsSection from "@/components/home/StatsSection";
import TimetableSection from "@/components/home/TimetableSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <StatsSection />
      <ProgramCards />
      <TimetableSection />
      <MapSection />
      <QuickConsult />
    </>
  );
}

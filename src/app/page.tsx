import { DeviceFrame } from "@/components/DeviceFrame";
import { RewindFlow } from "@/components/rewind/RewindFlow";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-stage">
      <DeviceFrame>
        <RewindFlow />
      </DeviceFrame>
    </main>
  );
}

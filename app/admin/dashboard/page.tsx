import BarComponent from "./charts/bar";
import AreaComponent from "./charts/area";
import LineComponent from "./charts/line";
import PieComponent from "./charts/pie";
import RadarComponent from "./charts/radar";

export default function Component() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 m-3">
        <div className="flex flex-col gap-4">
          <BarComponent />
        </div>
        <div className="flex flex-col gap-4">
          <AreaComponent />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 m-3 lg:grid-cols-3">
        <div className="flex flex-col gap-4 md:col-span-2">
          <LineComponent />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
          <PieComponent />
          <RadarComponent />
        </div>
      </div>
    </>
  );
}

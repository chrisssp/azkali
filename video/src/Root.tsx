import { Composition } from "remotion";
import { ScreenStudioStyleComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ScreenStudioStyle"
        component={ScreenStudioStyleComposition}
        durationInFrames={270}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          screenshotSrc: undefined,
        }}
      />
    </>
  );
};

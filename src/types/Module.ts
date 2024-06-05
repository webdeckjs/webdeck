import { FC } from "react";
import { Config } from "../hooks/useProfiles";

type ModuleIcon = {
  icon: string;
  keywords?: string[];
  alt?: string;
  title?: string;
};

export type ModuleManifest = {
  icons?: Record<string, ModuleIcon>;
  version?: string;
  bespoke?: boolean;
  extension_required?: boolean;
};

export type DrawKey = ({
  canvas,
  ctx,
}: {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}) => void;

type ModuleOnPress = {
  config: Record<string | number, unknown>;
  keyIndex: number;
  setIcon: unknown;
  extension: unknown;
};

type ModuleInit = {
  drawKey: (callback: DrawKey) => void;
  config: Config;
  getConfig: () => Config;
};

export type Module = {
  default: FC;
  manifest?: ModuleManifest;
  init?: (args: ModuleInit) => () => void | void;
  onPress?: (params: ModuleOnPress) => void;
};

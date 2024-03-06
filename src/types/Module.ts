import { FC } from "react";

type ModuleIcon = {
  icon: string;
  keywords?: string[];
  alt?: string;
  title?: string;
};

export type ModuleManifest = {
  icons: Record<string, ModuleIcon>;
};

type ModuleOnPress = {
  config: Record<string | number, unknown>;
  keyIndex: number;
  setIcon: unknown;
};

export type Module = {
  default: FC;
  manifest?: ModuleManifest;
  init?: () => void;
  onPress?: (params: ModuleOnPress) => void;
};

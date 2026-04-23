export interface DesktopGestureEnvironment {
  innerWidth: number;
  hasFinePointer: boolean;
  hasCameraApi: boolean;
}

export interface PauseGestureProcessingInput {
  enabled: boolean;
  visibilityState: DocumentVisibilityState;
  dialogOpen: boolean;
}

export function isDesktopGestureEnvironment(
  input: DesktopGestureEnvironment
): boolean {
  return input.innerWidth >= 1024 && input.hasFinePointer && input.hasCameraApi;
}

export function hasOpenDialog(root: ParentNode = document): boolean {
  return Boolean(root.querySelector('[role="dialog"][data-state="open"]'));
}

export function shouldPauseGestureProcessing(
  input: PauseGestureProcessingInput
): boolean {
  return (
    !input.enabled ||
    input.visibilityState !== "visible" ||
    input.dialogOpen
  );
}

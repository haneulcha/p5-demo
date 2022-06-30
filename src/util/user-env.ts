export async function getCameraPermission() {
  const permissionName = 'camera' as PermissionName;
  const result = await navigator.permissions.query({ name: permissionName });
  console.log({ result });
}

export async function getUserMedia(
  constraints: MediaStreamConstraints = { video: true, audio: false },
): Promise<MediaStream | void> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log({ stream });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.name === 'ConstraintNotSatisfiedError') {
        console.log('constraint not satisfied');
      } else if (error.name === 'PermissionDeniedError') {
        console.log('permission denied');
      }
    }
  }
}

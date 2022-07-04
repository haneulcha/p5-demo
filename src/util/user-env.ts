export async function getCameraPermissionState() {
  const permissionName = 'camera' as PermissionName;

  try {
    const result = await navigator.permissions.query({ name: permissionName });
    return result.state;
  } catch (error) {
    const devices = await getAvailableDevices();
    return devices.length ? 'granted' : undefined;
  }
}

export async function getUserMedia(
  constraints: MediaStreamConstraints = { video: { facingMode: 'user' }, audio: false },
): Promise<MediaStream | void> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
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

async function getAvailableDevices() {
  let availableDevices: { deviceId: string; label: string }[] = [];
  const devices = await navigator.mediaDevices.enumerateDevices();

  devices.forEach(device => {
    if (device.kind === 'videoinput' && device.deviceId) {
      availableDevices.push({ deviceId: device.deviceId, label: device.label });
    }
  });

  return availableDevices;
}

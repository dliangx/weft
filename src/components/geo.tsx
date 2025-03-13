import {
    checkPermissions,
    requestPermissions,
    getCurrentPosition,
    watchPosition
  } from '@tauri-apps/plugin-geolocation'
  
  let permissions = await checkPermissions()
  if (
    permissions.location === 'prompt' ||
    permissions.location === 'prompt-with-rationale'
  ) {
    permissions = await requestPermissions(['location'])
  }
  
  if (permissions.location === 'granted') {
    const pos = await getCurrentPosition()
    console.log(pos)
    await watchPosition(
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      (pos) => {
        console.log(pos)
      }
    )
  }
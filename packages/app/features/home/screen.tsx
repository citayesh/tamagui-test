import React, { useEffect, useState } from 'react'
import { useRouter } from 'solito/navigation'
import { Button, H1, Image, XStack, YStack } from 'tamagui'
import { ArrowLeft, ArrowRight, AlignJustify, ArrowRightToLine } from '@tamagui/lucide-icons'
import { useAppSelector, useAppDispatch } from 'app/provider/store/hooks'
import MenuScreen from './menu'
import { Dimensions } from 'react-native'
import { clearName } from 'app/provider/store/userSlice'

const images = [
  'https://tamagui.dev/assets/photo3-B5s3QutM.jpg',
  'https://tamagui.dev/assets/photo1-BZgULsKC.jpg',
  'https://tamagui.dev/assets/photo2-CZEC9624.jpg',
]

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export function HomeScreen() {
  const name = useAppSelector((state) => state.user.name)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!name) router.replace('/login')
    setMenuOpen(false)
  }, [name, router])

  const onLogout = () => {
    dispatch(clearName())
    router.replace('/login')
  }

  const [[page, direction], setPage] = useState<[number, number]>([0, 0])
  const imageIndex = React.useMemo(() => wrap(0, images.length, page), [page])
  const paginate = (newDirection: number) => setPage([page + newDirection, newDirection])

  const [menuOpen, setMenuOpen] = useState(false)

  if (!name) return null
const { width: screenWidth } = Dimensions.get('window')

const drawerWidth = screenWidth > 768 ? '38%' : '80%'
  return (
    <YStack flex={1} jc="flex-start" ai="flex-start" p="$4" bg="$background" fullscreen={true}>
      <XStack flex={1} flexDirection="row" width="100%" ai="center" jc="space-between" gap="$3">
         <YStack flex={1}><H1> slideshow</H1></YStack>
       <YStack> <Button
          icon={AlignJustify}
          size="$5"
          circular
          onPress={() => setMenuOpen(true)}
        /></YStack>
      </XStack>

      <XStack
        mt="$4"
        overflow="hidden"
        backgroundColor="#000"
        position="relative"
        height="90%"
        width="100%"
        alignItems="center"
      >
        <Image
          key={page}
          source={{ uri: images[imageIndex], width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <Button
          icon={ArrowLeft}
          size="$5"
          position="absolute"
          left="$4"
          circular
          elevate
          onPress={() => paginate(-1)}
          zIndex={100}
        />
        <Button
          icon={ArrowRight}
          size="$5"
          position="absolute"
          right="$4"
          circular
          elevate
          onPress={() => paginate(1)}
          zIndex={100}
        />
      </XStack>

      {menuOpen && (
        <>
          <YStack
            fullscreen
            backgroundColor="rgba(255, 255, 255, 0.3)"
            style={{ backdropFilter: 'blur(8px)' }}
            onPress={() => setMenuOpen(false)}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={200}
          />

          <YStack
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            width={drawerWidth}
              backgroundColor="#fff"
            zIndex={210}
            p="$4"
            elevation={4}
          >
            <XStack width="100%" flexDirection="row-reverse">
            <Button onPress={() => setMenuOpen(false)} size="$5" icon={ArrowRightToLine} circular/>
              </XStack>
              <MenuScreen />
                       <Button onPress={onLogout} mt="$6" width="100%">
        Logout
      </Button>
          </YStack>
        </>
      )}
    </YStack>
  )
}

import { useRouter } from 'solito/navigation'
import { H3, YStack } from '@my/ui'
import SVG from 'app/components/svg'
import { Square, Button, XStack } from 'tamagui'
import { useAppSelector, useAppDispatch } from 'app/provider/store/hooks'

export default function MenuScreen() {
  const name = useAppSelector((state) => state.user.name)
  const dispatch = useAppDispatch()
  const router = useRouter()

  return (
    <YStack flex={1} p="$2" bg="$background" width="50%" jc="space-between" height="100%">
        <XStack ai="center" gap="$4">
          <Square
            animation="slow"
            animateOnly={['transform']}
            enterStyle={{ rotate: '0deg' }}
            rotate="360deg"
            size={100}
          >
            <SVG name="galleryIcon" width={80} height={80} />
          </Square>
          <H3 paddingTop={30}>Hi, {name} 👋</H3>
        </XStack>
    
    </YStack>
  )
}

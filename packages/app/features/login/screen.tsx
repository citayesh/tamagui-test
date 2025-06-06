import { Button, H1, Input, YStack } from '@my/ui'
import { useState } from 'react'
import { useRouter } from 'solito/navigation'
import { useAppDispatch } from 'app/provider/store/hooks'
import { setName } from 'app/provider/store/userSlice'

export function LoginScreen() {
  const [inputName, setInputName] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogin = () => {
    if (!inputName.trim()) return
    dispatch(setName(inputName.trim()))
    router.replace('/')
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
      <H1>Login</H1>
      <Input
        placeholder="Enter your name"
        value={inputName}
        onChangeText={setInputName}
      />
      <Button onPress={handleLogin}>Login</Button>
    </YStack>
  )
}

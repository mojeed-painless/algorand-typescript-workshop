import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { PersonalBankFactory } from '../smart_contracts/artifacts/personal_bank/PersonalBankClient'
import dotenv from 'dotenv'
dotenv.config()

async function callDeposit() {
  const algorand = AlgorandClient.testNet()
  const sender = await algorand.account.fromMnemonic(process.env.DEPLOYER_MNEMONIC!)

  const factory = algorand.client.getTypedAppFactory(PersonalBankFactory, {
    defaultSender: sender.addr,
  })

  const appClient = factory.getAppClientById({ appId: BigInt() })

  await appClient.(
    { githubHandle: 'mojeed-painless' },
    {
      sender,
      boxes: [
        {
          appId: BigInt(0),
          name: new Uint8Array(Buffer.from('github')),
        },
      ],
      sendParams: { fee: 1000 },
    },
  )

  console.log('✅ GitHub handle box "github"')
}

callDeposit().catch(console.error)

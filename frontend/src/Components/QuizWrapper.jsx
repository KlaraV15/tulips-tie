import { useParams } from 'react-router-dom'
import EasyCulture from './Culture/EasyCulture'
import MediumCulture from './Culture/MediumCulture'
import HardCulture from './Culture/HardCulture'
import EasyGeography from './Geography/EasyGeography'
import MediumGeography from './Geography/MediumGeography'
import HardGeography from './Geography/HardGeography'
import EasyPolitics from './Politics/EasyPolitics'
import MediumPolitics from './Politics/MediumPolitics'
import HardPolitics from './Politics/HardPolitics'
import EasyHistory from './History/EasyHistory'
import MediumHistory from './History/MediumHistory'
import HardHistory from './History/HardHistory'
import EasyEconomy from './economy/Easy'
import MediumEconomy from './economy/Medium'
import HardEconomy from './economy/Hard'
import EasyFacts from './fun_facts/Easy'
import MediumFacts from './fun_facts/Medium'
import HardFacts from './fun_facts/Hard'
import EasyNature from './nature_wildlife/Easy'
import MediumNature from './nature_wildlife/Medium'
import HardNature from './nature_wildlife/Hard'
import EasySports from './sports/Easy'
import MediumSports from './sports/Medium'
import HardSports from './sports/Hard'

export default function QuizWrapper() {
  const { category, difficulty } = useParams()

  // Map category and difficulty to the correct component
  const componentMap = {
    'culture-easy': EasyCulture,
    'culture-medium': MediumCulture,
    'culture-hard': HardCulture,
    'geography-easy': EasyGeography,
    'geography-medium': MediumGeography,
    'geography-hard': HardGeography,
    'politics-easy' : EasyPolitics,
    'politics-medium' : MediumPolitics,
    'politics-hard' : HardPolitics,
    'history-easy' : EasyHistory,
    'history-medium' : MediumHistory,
    'history-hard' : HardHistory,
    'economy-easy' : EasyEconomy,
    'economy-medium' : MediumEconomy,
    'economy-hard' : HardEconomy,
    'funFacts-easy' : EasyFacts,
    'funFacts-medium' : MediumFacts,
    'funFacts-hard' : HardFacts,
    'natureWildlife-easy' : EasyNature,
    'natureWildlife-medium' : MediumNature,
    'natureWildlife-hard' : HardNature,
    'sports-easy' : EasySports,
    'sports-medium' : MediumSports,
    'sports-hard' : HardSports,
  }

  const Component = componentMap[`${category}-${difficulty}`]

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <p>This quiz combination doesn't exist yet.</p>
        </div>
      </div>
    )
  }

  return <Component />
}
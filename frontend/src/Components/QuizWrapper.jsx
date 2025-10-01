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
    'history-hard' : HardHistory
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
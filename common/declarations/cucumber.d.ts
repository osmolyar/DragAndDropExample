interface Step {
    keyword: string
    text: string
    arguments: string[]
}
interface Tag {
    name: string
}
interface Scenario {
    name: string
    steps: Step[]
    tags: Tag[]
}
interface Feature {
    document: {
        feature: {
            name: string
            description: string
        }
    }
}
interface StepData {
    scenario: Scenario
    step: Step
}
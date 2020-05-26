/**
 * Maintains a stack of pages traversed so that actions can be "backed out" to parent pages.
 * @module StackP
 * @author Andrew Ray <aray@intersystems.com>
 */

/**
 * Pushes the current page onto the stack and sets `context.page` to the given page.
 * @param page The page to open.
 */
export function pushP(page) {
    if (context.stackP === undefined) {
        context.stackP = []
    }

    context.page = page
    context.stackP.push(context.page)
    console.log("Pushed ", context.page.constructor.name, " to stack: ")
    context.stackP.forEach((page, index) => console.log(index, ": ", page.constructor.name))
}

/**
 * Pops the top page off the stack and sets `context.page`.
 * @returns The page that was popped off the stack
 */
export function popP(validate?: boolean) {
    let removedPage = context.stackP.pop()
    context.page = context.stackP[context.stackP.length - 1] //(set context page to landing page of return action, not page that has just been popped)
    console.log("Popped ", removedPage.constructor.name, " from stack: ")
    context.stackP.forEach((page, index) => console.log(index, ": ", page.constructor.name))

    // check for a validate function
    if (validate && context.page.validatePageOpen instanceof Function) {
        context.page.validatePageOpen()
    }

    console.log("Current page is now ", context.page.constructor.name)
    return context.page
}

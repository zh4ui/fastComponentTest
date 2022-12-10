import { attr } from "@microsoft/fast-element";
import { FoundationElement } from "@microsoft/fast-foundation";
import { Button, fastButton, provideFASTDesignSystem } from "@microsoft/fast-components";
import { css, html } from "@microsoft/fast-element";
import type { ElementDefinitionContext } from "@microsoft/fast-foundation";

const counterStyles = (context: ElementDefinitionContext) => {
    const buttonTag = context.tagFor(Button);

    return css`
        ${buttonTag} {
            margin-inline-start: 12px;
        }
    `;
}

// Extend the configuration with custom properties
interface CounterDefinition extends FoundationElementDefinition {
    defaultButtonContent?: string;
}

const counterTemplate = (context: ElementDefinitionContext, definition: CounterDefinition) => {
    const buttonTag = context.tagFor(Button);

    return html`
        <div>The count is ${x => x.count}.</div>
        <${buttonTag} @click=${x => x.increment()}>
            <slot>${definition.defaultButtonContent}</slot>
            <!--Use the custom configuration-->
        </${buttonTag}>
    `;
}

export class Counter1 extends FoundationElement {
    @attr count = 0;

    increment() {
        this.count++;
    }
}

export const fastCounter1 = Counter1.compose<CounterDefinition>({
    baseName: 'counter1',
    template: counterTemplate,
    styles: counterStyles,
    defaultButtonContent: "Count 1!"
});

export class Counter2 extends Button {
    @attr count = 0;

    increment() {
        this.count++;
    }
}

export const fastCounter2 = Counter2.compose<CounterDefinition>({
    baseName: 'counter2',
    template: counterTemplate,
    styles: counterStyles,
    defaultButtonContent: "Count 2!"
});

export function registerFAST() {
    provideFASTDesignSystem()
        .register(
            fastButton(),
            fastCounter1(),
            fastCounter2(),
        )
}
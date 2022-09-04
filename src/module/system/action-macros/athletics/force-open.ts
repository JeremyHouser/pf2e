import { ActionMacroHelpers, SkillActionOptions } from "..";
import { ModifierPF2e } from "@actor/modifiers";

export function forceOpen(options: SkillActionOptions) {
    const { checkType, property, stat, subtitle } = ActionMacroHelpers.resolveStat(options?.skill ?? "athletics");

    const modifiers = (options.modifiers ?? []).concat(
        new ModifierPF2e({
            label: "PF2E.Actions.ForceOpen.Modifier.NoCrowbar",
            modifier: -2,
            predicate: {
                not: ["crowbar-in-possession"],
            },
        })
    );

    ActionMacroHelpers.simpleRollActionCheck({
        actors: options.actors,
        statName: property,
        actionGlyph: options.glyph ?? "A",
        title: "PF2E.Actions.ForceOpen.Title",
        subtitle,
        modifiers,
        rollOptions: ["all", checkType, stat, "action:force-open"],
        extraOptions: ["action:force-open"],
        traits: ["attack"],
        checkType,
        event: options.event,
        callback: options.callback,
        difficultyClass: options.difficultyClass,
        extraNotes: (selector: string) => [
            ActionMacroHelpers.note(selector, "PF2E.Actions.ForceOpen", "criticalSuccess"),
            ActionMacroHelpers.note(selector, "PF2E.Actions.ForceOpen", "success"),
            ActionMacroHelpers.note(selector, "PF2E.Actions.ForceOpen", "criticalFailure"),
        ],
    });
}

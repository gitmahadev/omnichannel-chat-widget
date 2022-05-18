export class TestSettingsConvControl {

    public static get AgentEmailFirst(): string {
        if (process.env.AgentEmailFirst) {
            return process.env.AgentEmailFirst;
        }

        throw new Error("Agent email for CC wasn't initialized");
    }

    public static get AgentEmailSecond(): string {
        if (process.env.AgentEmailSecond) {
            return process.env.AgentEmailSecond;
        }

        throw new Error("Agent email for CC wasn't initialized");
    }

    public static get QueueNameFirst(): string {
        return process.env.QueueNameFirst || "LCWAutomatedQueue";
    }

    public static get WorkStreamNameFirst(): string {
        return process.env.WorkStreamNameFirst || "LCWAutomatedWS";
    }

    public static get ChannelNameFirst(): string {
        return process.env.ChannelNameFirst || "LCWAutomatedChat";
    }

    public static get AuthChannelNameFirst(): string {
        return process.env.AuthChannelNameFirst || "LCWAuthAutomatedChat";
    }

    public static get ChannelNamePopOutWithLocation(): string {
        return process.env.LCWAutomatedChatPopOut || "LCWAutomatedChatPopOut";
    }

    public static get LCWAutomatedChatPopOutInvalidLocation(): string {
        return process.env.LCWAutomatedChatPopOutInvalidLocation || "LCWAutomatedChatPopOutInvalidLocation";
    }
}
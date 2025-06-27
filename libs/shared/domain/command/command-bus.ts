/**
 * The base contract for a command. It uses a "phantom property" `_resultType`
 * to associate a result type with the command without adding any runtime overhead.
 * @template TResult The type of the result that the command produces when handled.
 */
export abstract class Command<TResult = unknown> {
    /** A unique, static string identifier for the command type. */
    abstract readonly type: string;

    /**
     * PHANTOM PROPERTY: This property does not exist at runtime.
     * It is used only by the TypeScript compiler to infer the TResult type.
     * The `!` (non-null assertion) tells TypeScript to not worry about it being uninitialized,
     * because we know it's only for type-checking.
     */
    readonly _resultType!: TResult;
}

/**
 * A utility type to infer the result type `R` from a `Command<R>`.
 * This works perfectly with the phantom type.
 */
export type CommandResult<T extends Command> = T extends Command<infer R> ? R : never;

// The rest of your definitions (CommandHandler, CommandBus) remain unchanged.
// They don't need to know about this implementation detail.
export interface CommandHandler<C extends Command = Command> {
    readonly commandType: C['type'];

    execute(command: C): CommandResult<C> | Promise<CommandResult<C>>;
}

export abstract class CommandBus {
    abstract dispatch<T extends Command>(command: T): Promise<CommandResult<T>>;
}

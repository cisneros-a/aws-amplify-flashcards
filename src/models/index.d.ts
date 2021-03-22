import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Cards {
  readonly id: string;
  readonly stacksID?: string;
  readonly question?: string;
  readonly answer?: string;
  constructor(init: ModelInit<Cards>);
  static copyOf(source: Cards, mutator: (draft: MutableModel<Cards>) => MutableModel<Cards> | void): Cards;
}

export declare class Stacks {
  readonly id: string;
  readonly title: string;
  readonly userID?: string;
  readonly Cards?: (Cards | null)[];
  constructor(init: ModelInit<Stacks>);
  static copyOf(source: Stacks, mutator: (draft: MutableModel<Stacks>) => MutableModel<Stacks> | void): Stacks;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly Stacks?: (Stacks | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}
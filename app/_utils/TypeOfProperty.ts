export type TypeOfProperty<ParentInterface, Property extends keyof ParentInterface> = Pick<
  ParentInterface,
  Property
>[Property];

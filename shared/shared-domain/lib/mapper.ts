export interface Mapper<I, O> {
  mapFrom(param: I): O;

  mapTo(param: O): I;
}

export interface MapperAsync<I, O> {
  mapFrom(param: I): Promise<O>;

  mapTo(param: O): Promise<I>;
}

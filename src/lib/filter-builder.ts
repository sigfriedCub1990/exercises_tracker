interface Filters {
  limit?: number;
  match?: unknown;
}

type QueryParams = string | undefined;

export default class FilterBuilder {
  private from: Date | null;
  private to: Date | null;
  private limit: number | null;

  constructor(from: QueryParams, to: QueryParams, limit: QueryParams) {
    this.from = from ? new Date(from) : null;
    this.to = to ? new Date(to) : null;
    this.limit = limit ? Number.parseInt(limit) : null;
  }

  build(): Filters {
    const result = {} as Filters;
    if (this.from) {
      result.match = { date: { $gte: this.from } };
    }
    if (this.to) {
      if (result.match) {
        result.match = { date: { $gte: this.from, $lte: this.to } };
      } else {
        result.match = { date: { $lte: this.to } };
      }
    }
    if (this.limit) result.limit = this.limit;

    return result;
  }
}

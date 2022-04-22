interface HistoryList {
  name: string
  stationId: number | string | null
}

interface ModuleStateRefuel {
  rule: number
  exempt: boolean,
  oilId: number,
  oilName: string,
  searchHistory: HistoryList[]
}

export const MESSAGES = {
    APPLICATION_START: `Starting Nest application...`,
    APPLICATION_READY: `Nest application successfully started`,
    MICROSERVICE_READY: `Nest microservice successfully started`,
    UNKNOWN_EXCEPTION_MESSAGE: 'Internal server error',
    ERROR_DURING_SHUTDOWN: 'Error happened during shutdown',
    CALL_LISTEN_FIRST:
      'app.listen() needs to be called before calling app.getUrl()',
};

export const COVID19_DOWNLOADED_FILE_PATH = {
  DAILY_CSV_REPORT: `data/covid_19/daily_reports`,
  TIME_SERIES_CSV_REPORT: `data/covid_19/time_series/daily_reports`,
  SITE_PDF_REPORT: `data/covid_19/site_pdf_reports`,
  SITE_TIME_SERIES_CSV_REPORT: `data/covid_19/site_time_series_reports`,
  WLD_POP_CSV_REPORT: `data/covid_19/world_population_reports`,
};

export enum TIME_SERIES_COVID19_CSV_REPORT {
  CONFIRM_G = "time_series_covid19_confirmed_global.csv",
  DEATH_G = "time_series_covid19_deaths_global.csv",
  RECOVER_G = "time_series_covid19_recovered_global.csv"
}
  
export const MONGODB_ATLAS_URL = "";
export const MONGODB_LOCALHOST_URL = "";

export const COVID19_SIT_REPO_TIME_SER_FILE_NAME = "who_covid_19_sit_rep_time_series.csv";
export const WORLD_POP_FILE_NAME = "UID_ISO_FIPS_LookUp_Table.csv";
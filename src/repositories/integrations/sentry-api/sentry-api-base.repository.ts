import { config } from "../../../config/config";
import { AxiosFetcherHelper } from "../../../infrastructure/helpers/axios-fetcher.helper";
import { SentryOrganizationConstant } from "../../../utils/constants/sentry-organization.constant";

export class SentryAPIBaseRepository {
    protected axiosFetcher: AxiosFetcherHelper;
    protected organization: string = SentryOrganizationConstant.DEFAULT;

    constructor() {
        this.axiosFetcher = new AxiosFetcherHelper(
            config.sentry.api.baseUrl,
            config.sentry.api.authToken
        );
    }
}

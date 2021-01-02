export interface IErrMessages {
  E_RATE_LIMITS_EXCEEDED: string;
  E_AN_ERROR_OCCURRED: string;
}

export const errMsgCode: IErrMessages = {
  E_RATE_LIMITS_EXCEEDED: 'Ops you have exceeded the rate limits',
  E_AN_ERROR_OCCURRED: 'An error occurred while fetching data',
};

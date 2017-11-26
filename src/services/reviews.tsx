import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { InvalidIdError, InvalidPropertyError } from "./exceptions";

export interface ReviewItem {
    id: string,
    hostPrep: number,
    matchedDesc: number,
    wouldReturn: boolean,
    reviewerId: string,
    eventId: string,
}

export interface CreateReviewItem {
    hostPrep: number,
    matchedDesc: number,
    wouldReturn: boolean,
    eventId: string,
}

export interface UpdateReviewItem {
    hostPrep: number,
    matchedDesc: number,
    wouldReturn: boolean,
}

export class ReviewService {
    public static async requestGetReview(id: string): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.reviews + "/" + id

        let requestProperties = {
            params: {}
        }

        Object.assign(requestProperties, UserService.getAuthenticationHeader())

        return axios.get(url, requestProperties);
    }

    public static async getReview(id: string): Promise<ReviewItem> {

        let item: ReviewItem = null;

        let response: AxiosResponse;

        try {
            response = await this.requestGetReview(id);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                throw new InvalidIdError(id);
            } else {
                throw e;
            }
        }

        if (response.status === 200) {
            item = {
                id: id,
                hostPrep: response.data.host_prep,
                matchedDesc: response.data.matched_desc,
                wouldReturn: response.data.would_ret,
                reviewerId: response.data.reviewer_id,
                eventId: response.data.event_id,
            }
            return item;
        }
    }

    public static async requestCreateReview(review: CreateReviewItem): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.reviews

        let body = {
            "review":
                {
                    "event_id": review.eventId,
                    "host_prep": review.hostPrep,
                    "matched_desc": review.matchedDesc,
                    "would_ret": review.wouldReturn
                }
        }
        return axios.post(url, body, UserService.getAuthenticationHeader());
    }

    public static async createReview(review: CreateReviewItem): Promise<ReviewItem> {

        let item: ReviewItem = null;

        let response: AxiosResponse;

        if (!review.eventId) {
            throw new InvalidPropertyError("eventId", review.eventId);
        }

        try {
            response = await this.requestCreateReview(review);
        } catch (e) {
            if (e.response && (e.response.status >= 400 && e.response.status < 500)) {
                throw new InvalidPropertyError("eventId", review.eventId);
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            item = {
                id: response.data.review_id,
                hostPrep: response.data.host_prep,
                matchedDesc: response.data.matched_desc,
                wouldReturn: response.data.would_ret,
                reviewerId: response.data.reviewer_id,
                eventId: response.data.event_id,
            }
            return item;
        }
    }


    public static async requestUpdateReview(reviewId: string, review: UpdateReviewItem): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.reviews + "/" + reviewId

        let body = {
            "host_prep": review.hostPrep,
            "matched_desc": review.matchedDesc,
            "would_ret": review.wouldReturn,
        }
        return axios.put(url, body, UserService.getAuthenticationHeader());
    }

    public static async updateReview(reviewId: string, review: UpdateReviewItem): Promise<ReviewItem> {

        let updatedReview: ReviewItem

        let response: AxiosResponse;

        try {
            response = await this.requestUpdateReview(reviewId, review);
        } catch (e) {
            if (e.response && (e.response.status >= 400 && e.response.status < 500)) {
                throw new InvalidPropertyError("unknown", review);
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            updatedReview = {
                id: response.data.review_id,
                hostPrep: response.data.host_prep,
                matchedDesc: response.data.matched_desc,
                wouldReturn: response.data.would_ret,
                reviewerId: response.data.reviewer_id,
                eventId: response.data.event_id,
            }
            return updatedReview;
        }
    }
}
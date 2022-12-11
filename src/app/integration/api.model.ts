export interface AnimeApiResponse {
  data: {
      id: string,
      type: string,
      attributes: {
        description: string,
        canonicalTitle: string,
        averageRating: string,
        posterImage: {
          large: string
        }
      }
    }
}

export interface QueryApiResponse {
  data: [
    {
      id: string,
      type: string,
      attributes: {
        description: string,
        canonicalTitle: string,
        averageRating: string,
        posterImage: {
          large: string
        }
      }
    }
  ]
}

export interface StreamingLinkApiResponse {
  data:[
    {
      attributes: {
        url: string
      }
    }
  ]

}

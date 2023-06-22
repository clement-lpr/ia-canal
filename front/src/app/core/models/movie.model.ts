import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('movie')
export class Movie {
  @JsonProperty('id', Number, true)
  public id = 0;

  @JsonProperty('Title', String, true)
  public title = '';

  @JsonProperty('US Gross', Number, true)
  public usGross? = 0;

  @JsonProperty('US DVD Sales', Number, true)
  public usDvdSales? = 0;

  @JsonProperty('Worldwide Gross', Number, true)
  public worldwideGross? = 0;

  @JsonProperty('Production Budget', Number, true)
  public productionBudget? = 0;

  @JsonProperty('Release Date', String, true)
  public releaseDate? = '';

  @JsonProperty('Distributor', String, true)
  public distributor? = '';

  @JsonProperty('IMDB Rating', Number, true)
  public imdbRating? = 0;

  @JsonProperty('IMDB Votes', Number, true)
  public votes? = 0;

  @JsonProperty('Major Genre', String, true)
  public genre? = '';

  @JsonProperty('Director', String, true)
  public director? = '';

  @JsonProperty('Rotten Tomatoes Rating', Number, true)
  public rotenRating? = 0;
}

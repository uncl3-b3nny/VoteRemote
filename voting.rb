require 'sinatra'
require 'yaml/store'

CHOICES = {
  'Yay' => 'Yay',
  'Nay' => 'Nay'
}

get '/' do
  @title = 'This is important. We need your vote.'
  erb :index
end

post '/cast' do
  @title = 'Thanks for casting your vote!'
  @vote  = params['vote']

  # create a votes.yml file and update the particular votes
  @store = YAML::Store.new 'votes.yml'
  @store.transaction do
    @store['votes'] ||= {}
    @store['votes'][@vote] ||= 0
    @store['votes'][@vote] += 1
  end
  erb :cast
end

get '/results' do
  @title = 'Results so far:'
  @store = YAML::Store.new 'votes.yml'
  @votes = @store.transaction { @store['votes'] }
  erb :results
end

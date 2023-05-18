Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      
      resources :clients, only: [:index, :create, :show]
      resources :interventions, only: [:index, :update, :destroy, :create]

    end
  end
end

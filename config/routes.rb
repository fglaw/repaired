Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get 'dashboard', to: "pages#dashboard"
  resources :repairs, only: :index do
    resources :bookings, only: [:new, :create, :show, :update]
  end
  resources :bookings, only: [:new, :create, :show] do
    resources :reviews, only: [:new, :create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end  



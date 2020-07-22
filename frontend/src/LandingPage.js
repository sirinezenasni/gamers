import React from 'react';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import Card from './Card.js';
import NewsletterForm from './NewsletterForm';

const products = [
  {
    brand: 'Connect with other gamers',
    description: 'Connect with your friends and make new connections.',
    image: "connect.png"
  },
  {
    brand: 'Create tournements and share your score',
    description: 'You can create tournements with your group and get ranked by your score!',
    image: "tournements.jpg"
  },
   {
    brand: 'Create your profile',
    description: 'Allow other gamers to know you!',
    image: "profile.png"
  },
]

function LandingPage() {
  return (
    <div>
      <NavBar />
      <Jumbotron>
        <NewsletterForm />
      </Jumbotron>
        
      <Jumbotron>
      <div className="row">
      {
        products.map(
          (product, i) =>
            <div key={i} className="col-lg-4 col-sm-6">
            <Card
              title={product.brand}
              description={product.description}
              image={product.image}/>
            </div>
        )
      }
      </div>
      </Jumbotron>
    </div>
  );
}

export default LandingPage;

/*import React from 'react';
import LeftSection from '../../components/JobProvider/index';
import RightSection from '../../components/JobProvider/rightsection';

const HomePageForJobProvider: React.FC = () => {
  return (
    <div className=' flex flex-col lg:flex-row  h-full lg:h-full justify-between items-start bg-white'>
      <LeftSection />
      <RightSection />
   </div>
  );
};

export default HomePageForJobProvider;*/
// App.tsx
import React from 'react';
import LeftSection from '../../components/JobProvider/index';
import RightSection from '../../components/JobProvider/rightsection'

const App = () => {
  return (
    <div className="min-h-screen bg-gwhite lg:w-full lg:h-full overflow-hidden flex flex-col lg:flex-row">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default App;


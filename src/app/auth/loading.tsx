const AuthLoading = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-card flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 lg:hidden animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-md" />
          <div className="h-4 w-72 bg-muted rounded-md" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-12 w-full bg-muted rounded-lg" />
          <div className="h-12 w-full bg-muted rounded-lg" />
          <div className="h-12 w-full bg-muted rounded-lg" />
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-2 w-full h-full absolute inset-0 animate-pulse">
        <div className="flex flex-col justify-center items-center p-12">
          <div className="w-full max-w-md space-y-6">
            <div className="h-10 w-64 bg-muted rounded-md" />
            <div className="h-4 w-80 bg-muted rounded-md" />
            <div className="space-y-4 pt-4">
              <div className="h-12 w-full bg-muted rounded-lg" />
              <div className="h-12 w-full bg-muted rounded-lg" />
              <div className="h-14 w-full bg-muted rounded-lg" />
            </div>
          </div>
        </div>
        <div className="bg-muted/40 h-full w-full flex items-center justify-center p-16">
          <div className="max-w-md w-full space-y-6 text-center flex flex-col items-center">
            <div className="w-64 h-64 bg-muted/60 rounded-full" />
            <div className="h-8 w-48 bg-muted rounded-md mx-auto" />
            <div className="h-16 w-full bg-muted rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;

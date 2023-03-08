<script>
    import { auth } from '$lib/firebase';
	import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";

    const user = auth.currentUser;

    console.log(user);


    function submitHandler(event){
        const confirmed = confirm("Are you sure you want to change your password?","Yes", "No");
        const form = event.target;
        const data = Object.fromEntries(new FormData(form));
        console.log(data.currentpass, data.confirmpass, data.newpass);

        const credential = EmailAuthProvider.credential(user.email, data.currentpass);


        if(confirmed){


            reauthenticateWithCredential(user, credential).then(() => {

            if (data.newpass === data.confirmpass) {
                
                updatePassword(user, data.newpass).then(() => {

                    alert("Password updated successfullly");
                    console.log("Password updated successfully");
                    form.reset();

                }).catch((error) => {
                    console.error("Error updating password:", error);
                });

            } else {

                alert("New password and confirmation do not match");

            }
            }).catch((error) => {
                alert("Current Password do not match!");
                console.error("Error re-authenticating user:", error);
            });


        }

    }

</script>
<span class="font-semibold text-2xl mb-8">Settings</span>


<div class="card bg-base-100">
    <div class="card-body">
        <h1 class="font-bold text-sm text-black/50">Change Admin Password</h1>
        <hr>

        <form on:submit|preventDefault={submitHandler}>
            <div class="form-control">
                <p class="label"><span class="label-text">Current Password <span class="text-red-500 font-bold">*</span></span></p>
                <input
                    required
                    type="password"
                    name="currentpass"
                    placeholder="Type current password"
                    class="input input-bordered max-w-md"
                />
            </div>

            <div class="form-control">
                <p class="label"><span class="label-text">New Password <span class="text-red-500 font-bold">*</span></span></p>
                <input
                    required
                    type="password"
                    name="newpass"
                    placeholder="Type new password"
                    class="input input-bordered max-w-md"
                />
            </div>

            <div class="form-control">
                <p class="label"><span class="label-text">Confirm Password <span class="text-red-500 font-bold">*</span></span></p>
                <input
                    required
                    type="password"
                    name="confirmpass"
                    placeholder="Retype new password"
                    class="input input-bordered max-w-md"
                />
            </div>


            <div class="form-control my-6">
                <button
                    class="btn btn-ghost btn-square btn-sm bg-sky-700 text-white rounded capitalize px-8 text-base hover:bg-sky-600"
                    >Save</button
                >
            </div>

        </form>

    </div>
</div>